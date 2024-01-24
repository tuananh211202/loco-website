import { Input, Modal, Radio, RadioChangeEvent, message } from "antd";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { ImageApi, PostApi } from "../../midlewares/api";

export const  UploadPostModal = (props) => {
  const { isOpen, setIsOpen } = props;
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>();
  const [mode, setMode] = useState('normal'); 
  const [description, setDescription] = useState('');

  const uploadPostMutation = useMutation(PostApi.uploadPost);

  const uploadImageMutation = useMutation(ImageApi.uploadImage, {
    onSuccess: (data) => {
      uploadPostMutation.mutate({
        imageUrl: data.path,
        mode,
        description
      });
    }
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = event.target.files && event.target.files[0];
    if (uploadFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result as string;

        image.onload = () => {
          setPreviewUrl(reader.result as string);
          setFile(uploadFile);
        }
      }

      reader.readAsDataURL(uploadFile);
    } else setPreviewUrl('');
  };

  const handleChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  }

  const handleCancel = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setPreviewUrl('');
    setFile(undefined);
    setIsOpen(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleOk = () => {
    if(!file && !description.length) message.error('Please fill out all fields completely!');
    else {
      const formData = new FormData();
      formData.append('image', file);
      uploadImageMutation.mutate(formData);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setPreviewUrl('');
      setDescription('');
      setIsOpen(false);
      message.success('Upload post successfully');
    }
  };

  return (
    <Modal 
      open={isOpen} 
      onCancel={handleCancel}
      centered
      closeIcon={false}
      onOk={handleOk}
    >
      {previewUrl.length ? <img src={previewUrl} style={{ width: '100%' }} /> : null}
      <input type="file" accept="image/*" style={{ border: 'solid', borderWidth: '1px', borderRadius: '3px', width: '100%' }} onChange={onChange} ref={fileInputRef} />
      <Radio.Group onChange={handleChange} value={mode} style={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Radio value='private'>Private</Radio>
        <Radio value='normal'>Normal</Radio>
        <Radio value='public'>Public</Radio>
      </Radio.Group>
      <Input.TextArea style={{ marginTop: '10px' }} value={description} onChange={handleInput} placeholder="Post description" />
    </Modal>
  );
}
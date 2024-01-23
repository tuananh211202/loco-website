import React from 'react'

/// Main style
export const layoutStyle: React.CSSProperties = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh',
};

export const headerStyle: React.CSSProperties = {
  color: 'white',
  padding: 0,
  display: 'flex',
  borderWidth: '0 0 1px 0px',
  borderStyle: 'solid',
  borderColor: '#6a5f62',
}

export const siderStyle: React.CSSProperties = {
  // backgroundColor: '#181d25',
}

export const leftContentStyle: React.CSSProperties = {
  width: '400px',
  backgroundColor: '#f0f5f9',
  color: 'black',
  padding: '0px 10px'
}

export const rightContentStyle: React.CSSProperties = {
  color: 'black',
  borderWidth: '0 0 0 1px',
  borderStyle: 'solid',
  borderColor: '#6a5f62',
  backgroundColor: '#fefeff',
};

/// Header content style
export const logoContainerStyle: React.CSSProperties = {
  width: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#12171b',
}

export const searchContainerStyle: React.CSSProperties = {
  width: 'calc(50vw + 100px)',
  backgroundColor: '#fefeff',
  padding: '0 20px',
  display: 'flex',
  alignItems: 'center',
}

export const searchStyle: React.CSSProperties = {
  width: '75%',
}

export const avatarContainerStyle: React.CSSProperties = {
  backgroundColor: '#fefeff',
  width: 'calc(50vw - 299px)',
  padding: '0 5px',
  borderWidth: '0 0 0 1px',
  borderStyle: 'solid',
  borderColor: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

// Right content styles
export const requestsContainerStyle: React.CSSProperties = {
  height: '33%',
  width: '100%',
  padding: '10px 5px 10px 10px',
}

export const friendsContainerStyle: React.CSSProperties = {
  height: '67%',
  width: '100%',
  padding: '10px',
}

// Main content styles
export const mainContentContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  display: 'flex',
  flexWrap: 'wrap'
}

const logoutHandler = async () => {
  console.log("Logout attempted.");

    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      console.log("Logout response successful.");
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  };
  
  document
  .querySelector('#logout')
  .addEventListener('click', logoutHandler);
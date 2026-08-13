const API_URL = import.meta.env.VITE_API_URL

async function GetUserRole() {
  const response = await fetch(`${API_URL}/api/authentication/getUserRole`, {
    credentials: 'include',
  })

  if (!response.ok) {
    return null
  }

  // Return the role from the response
  const data = await response.json()
  return data.role
}

export default GetUserRole

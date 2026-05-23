import AdminDashboard
from './AdminDashboard'

import StudentDashboard
from './StudentDashboard'

function Dashboard() {

  const role =
    localStorage.getItem('role')

  return role === 'admin'

    ? <AdminDashboard />

    : <StudentDashboard />
}

export default Dashboard
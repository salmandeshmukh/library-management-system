import Sidebar from '../components/Sidebar'

function DashboardLayout({ children }) {

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-6 overflow-auto">

        {children}

      </div>

    </div>
  )
}

export default DashboardLayout
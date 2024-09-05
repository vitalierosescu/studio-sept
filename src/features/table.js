import DataTable from 'datatables.net-dt'

function table() {
  const tables = [...document.querySelectorAll('.table_component')]

  tables.forEach((table) => {
    new DataTable(table)
  })
}

export default table

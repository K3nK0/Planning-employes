

export default function Employee({employee}) {

  
  return (
    <tr>
      <th>{employee.name}</th>
      <td>{employee.estimatedHours}</td>
      <td>{employee.hoursToDo}H</td>
      <td><button>modifier</button></td>
      <td><button>supprimer</button></td>
    </tr>
  )
}

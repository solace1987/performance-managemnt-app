import Kra from "./Kra";

export default function KraArea(props) {
  console.log(props);
  return (
    <>
      
       <td>{props.kraArea.name}</td>
          {
            props.kraArea.kras.map((kra, index) => {
              return (
                <>
                  <tr>
                  <td>{kra.name}</td>
                  </tr>
                </>
              )
            })
          }
      
    </>
  );
}

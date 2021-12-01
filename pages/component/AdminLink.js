import Link from 'next/link'

export default function AdminLink(props) {
  console.log(props.role)
        if (props.role == "Admin")
            {
                return (
                     <> 
                        <Link href="/admin/manage">
                          <a className=''>ADMIN</a>
                        </Link>
                    </>
                        )}
                    
        
       else{
           return (

            <>
            </>
           )
       }

    }

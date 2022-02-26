import Link from 'next/link'

export default function AdminLink(props) {
  
        if (props.role == "Admin"||props.role==="Super")
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

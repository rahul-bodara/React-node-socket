import React,{useState , useEffect} from 'react'
import { getUser } from '../middleware'
import { withRouter } from 'react-router-dom'

const Authenticate = (props) => {

    const [ state , setState ] = useState(undefined)

    useEffect(()=>{
        const jwt = getUser()


        if(jwt.user === null){
            props.history.push('/login')
        }
        else{
            setState(jwt.user)
        }


    })



        if(state == undefined){
            return(
                <h1>Loading....</h1>
            )
        }

        return(
        <div>{props.children}</div>
        )

}




export default withRouter(Authenticate)
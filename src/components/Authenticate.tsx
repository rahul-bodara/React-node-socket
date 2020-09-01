import React,{useState , useEffect} from 'react'
import { getUser } from '../middleware'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'

const Authenticate = (props) => {

    const [ state , setState ] = useState(undefined)

    useEffect(()=>{
        const jwt = getUser()
        if(!jwt){
            props.history.push('/login')
        }

        Axios.get(process.env.REACT_APP_NODE_API,{ headers : {authorization : `Bearer ${jwt}` }})
        .then(res =>  setState({user : res}))
        .catch(err => {
            localStorage.removeItem('cool-jwt')
            props.history.push('/login')
        })


    },[])



        if(state === undefined){
            return(
                <h1>Loading....</h1>
            )
        }

        return(
        <div>{props.children}</div>
        )

}




export default withRouter(Authenticate)
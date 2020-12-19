import React,{useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Form,
    FormGroup,
    Input,
Button,
ListGroup,
  ListGroupItem}
   from 'reactstrap'
import { addDoctor } from '../../js/actions/adminActions';
function AddDoctor() {
    const dispatch=useDispatch()
    const usernames = useSelector(state => state.authReducer.user.usernames)
    const [username, setUsername] = useState("")
    return (
        <div style={{minHeight:'500px'}}>
            <form>
                <FormGroup style={{display:"flex",marginLeft:'35%',marginTop:"10px"}}>

                    <Input style={{width:'30%'}} value={username} onChange={(e)=>setUsername(e.target.value)} ></Input>
                    <Button onClick={()=>dispatch(addDoctor(username))} color='primary'>Add</Button>

                </FormGroup>
            </form>
            <br/>
            <hr/>
            <ListGroup>
                <h3>Used usernames:</h3>
                {usernames.reverse().map((el)=>
            <ListGroupItem><h5>{el}</h5></ListGroupItem>    
                )}
            </ListGroup>

            
        </div>
    )
}

export default AddDoctor

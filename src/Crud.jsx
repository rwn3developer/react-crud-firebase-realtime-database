import axios from "axios";
import { getDatabase,ref,set } from "firebase/database";
import { useEffect, useState } from "react";


const Crud = () => {

    const [input,setInput] = useState({
        name : '',
        email : '',
        password : ''
    })
    const [item,setItem] = useState([]);
    const [editid,setEditid] = useState(false);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput({
            ...input,[name] : value
        })
    }

    const save = () => {
        const {name,email,password} = input;
        if(!name && !email && !password){
            alert("All field requirement");
        }else if(editid){
            axios.put(`https://crud-realtime-db-9c5eb-default-rtdb.firebaseio.com/users/${editid}.json`,{
                name : name,
                email : email,
                password : password
            }).then((response)=>{
                if(response){
                    alert("record successfully edit");
                    
                }
            })
            setInput({
                name : '',
                email : '',
                password : ''
            })
            setEditid(false);
        }else{
            axios.post("https://crud-realtime-db-9c5eb-default-rtdb.firebaseio.com/users.json",{
                name : name,
                email : email,
                password : password
            }).then((response)=>{
                if(response){
                    alert("record successfully save");
                    
                }
            })
            setInput({
                name : '',
                email : '',
                password : ''
            })
        }
    }

    const getAllrecord = () => {
        axios.get("https://crud-realtime-db-9c5eb-default-rtdb.firebaseio.com/users.json").then((res)=>{
            let data = res.data;
            let record = [];
            for(let i in data){
                record.unshift({
                    ...data[i],id : i
                })
            }
            setItem(record);
        })
    }
    getAllrecord();

    const deletedata = (id) => {
        axios.delete(`https://crud-realtime-db-9c5eb-default-rtdb.firebaseio.com/users/${id}.json`).then((res)=>{
            if(res){
                alert("record successfully delete");
                getAllrecord();
            }
        })
    }

    const editdata = (id) => {
        axios.get(`https://crud-realtime-db-9c5eb-default-rtdb.firebaseio.com/users/${id}.json`).then((res)=>{
            if(res){
               setInput(res.data);
               setEditid(id);
            }
        })
    }

    useEffect(()=>{
        getAllrecord();
    },[])

    return (
        <>
             <center>
                <table border={1}>
                    <tr>
                        <td>Name :- </td>
                        <td>
                            <input type="text" name="name" onChange={ (e) => handleChange(e) } value={input.name} />
                        </td>
                    </tr>
                    <tr>
                        <td>Email :- </td>
                        <td>
                            <input type="text" name="email" onChange={ (e) => handleChange(e) } value={input.email} />
                        </td>
                    </tr>
                    <tr>
                        <td>Password :- </td>
                        <td>
                            <input type="text" name="password" onChange={ (e) => handleChange(e) } value={input.password} />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            {
                                editid ? <input type="button" onClick={ () => save() } value="Edii"/> :  <input type="button" onClick={ () => save() } value="Submit"/>
                            }
                           
                        </td>
                    </tr>
                </table><br></br><br></br>

                <table border={1}>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Password</td>
                        <td>Action</td>
                    </tr>

                   
                        {
                            item.map((val)=>{
                                return (
                                    <tr>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td>{val.password}</td>
                                        <td>
                                            <button onClick={ () => deletedata(val.id) }>Delete</button>
                                            <button onClick={ () => editdata(val.id) }>Edit</button>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    
                </table>

            </center>



        </>
           
    )

}


export default Crud;
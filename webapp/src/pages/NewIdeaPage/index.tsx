import { useState } from "react"
import { Segment } from "../../components/Segment"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"


export const NewIdeaPage = () => {
  const [state, setState] = useState({
    name: '',
    nick: '',
    description: '',
    text: '',
  })
  const setFnc = (e) =>setState({...state, name: e.target.value})
  return (
 <Segment title="New Idea">
  <form onSubmit={e=>{
    e.preventDefault()
    console.log("submitted", state);
  }} className="rounded-lg bg-white/50">
    <Input title="Name" value="name" setFnc={setFnc}/>
    <Input title="Nick" value="nick" setFnc={setFnc}/>
    <Input title="Description" value="description" setFnc={setFnc}/>
    <Textarea title="Text" value="text" setFnc={setFnc}/>
    <button type="submit">create idea</button>
  </form>
 </Segment>
  )
}

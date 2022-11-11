import "./Description.css";

function Description(props:{description:string}){

    return <div className="up">
    <p className="title">Description</p>
    <p className="description" >{props.description.replace('',' ')}</p>
    </div>
}


export default Description;
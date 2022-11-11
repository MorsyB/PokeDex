
import "./Type.css";

function Type(props:{pokeType:{slot:Number, type:{name:string,url:string}}[]} ) {
    console.log(props.pokeType[0].type);
    return (
    <div className="pokeTypes">
        {props.pokeType.map((item) =>{return <p key = {item.type.name} className={item.type.name}>{item.type.name}</p>})}
    </div>
    )
}
export default Type;

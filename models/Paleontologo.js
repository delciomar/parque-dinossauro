import conexao from "../config/conexao.js";
const PaleontologoSchema = new conexao.Schema({
  nome: { type: String,required: true},
  nascimento:{type: String, required:false},
  descoberta:{type:Number, required:false}

});
const Paleontologo = 
conexao.model("Paleontologo", PaleontologoSchema);
export default Paleontologo;
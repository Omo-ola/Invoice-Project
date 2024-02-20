import { useParams } from "react-router-dom";

function InvoiceItem() {
    const { id } = useParams();
    console.log(id);
    
  return (
    <div>InvoiceItem</div>
  )
}

export default InvoiceItem
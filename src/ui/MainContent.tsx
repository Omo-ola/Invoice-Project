import Card from "./Card";

function MainContent() {
  
  return (
    <div className="mt-10">
      <Card types="paid"></Card>
      <Card types="pending"></Card>
      <Card types="draft"></Card>
    </div>
  );
}

export default MainContent;

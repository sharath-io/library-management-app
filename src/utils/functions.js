export const getFormattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const validImageCheck=(file) =>{
  if((file.size / (1024*1024)).toFixed(2) > 1){
return "Maximum file upload size is 1MB"
  }
  if(!file.type.startsWith("image/")){
    return "please upload only images"

  }

}
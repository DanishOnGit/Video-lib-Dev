

export const checkIfAlreadyPresent=(array,itemId)=>{

const result=array.find(item=>item.id===itemId)

return result;
}
const createUserBtn=document.querySelector("#user")
const startBtn=document.querySelector("#start")
const createUserdiv=document.querySelector(".create_user")
const userNameInput=document.querySelector("#userNameInput")
const newUserCreateBtn=document.querySelector("#create_user")
const newUserQuitBtn=document.querySelector("#quit_user")
const wrapper=document.querySelector("#wrapper")
const createSuccessfull=document.querySelector("#succes")
const notCreate=document.querySelector("#unsucces")
const page2=document.querySelector("#page2")

createUserBtn.addEventListener("click",()=>{
    notCreate.style.display="none"
    createUserdiv.style.display="block"
    userNameInput.focus()
    
    newUserCreateBtn.addEventListener("click",()=>{
        const inputvalue=userNameInput.value.trim()
        createUserBtn.style.textTransform = "capitalize"
        createUserBtn.innerHTML=inputvalue

        userNameInput.value=""
        
        
        createSuccessfull.style.display="block"
        createUserdiv.style.display="none"
        const settimeout=setTimeout(() => {
            createSuccessfull.style.display="none"
            
            
            clearTimeout(settimeout)
        }, 2000);
        
    })
    
    newUserQuitBtn.addEventListener("click",()=>{
        createUserdiv.style.display="none"
        
    })
    
})

startBtn.addEventListener("click",function(){
    createSuccessfull.style.display="none"
    page2.style.display="block"

    const inputvalue=userNameInput.value.trim()
    createUserBtn.style.textTransform = "capitalize"
    createUserBtn.innerHTML=inputvalue


    wrapper.style.display="none"
    if(userNameInput.value===""){
        notCreate.style.display="block"
        const settimeout=setTimeout(() => {
            notCreate.style.display="none"
            
            
            clearTimeout(settimeout)
        }, 2000);
        
    }else{

    }

})




let allIssues=[];

const allCardFetch =()=>{
  startLoding();
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then((data)=>{
      allIssues=data.data;
      allCardDisplay(data.data)
    endLoding();}
    )
}


const showIssueDeteils=(id)=>{
   let url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
   fetch(url)
   .then(res =>res.json())
   .then((data)=>modalinfoDisplay(data.data))
}
//deteils display
const modalinfoDisplay=(details)=>{
  console.log(details)
  const deteilsContainar=document.getElementById("modal-body");
  deteilsContainar.classList.add('space-y-3')
  deteilsContainar.innerHTML=`
   <div class="space-y-2">
            <h2 class="text-2xl font-semibold">Fix broken image uploads</h2>  
            <div class="flex gap-2">
              ${statusText(details)}
             
              <p class="text-gray-500"> <span class="status status-neutral mb-1"></span> Opened by ${details.assignee}</p>
              <p class="text-gray-500"> <span class="status status-neutral mb-1"></span>${details.createdAt}</p>             
            </div>
        </div>
        <div class=" flex gap-2">
            <!-- bugs and others -->
            ${labelsShow(details.labels)}
        </div>
        <div>
            <p class="text-gray-500">${details.description}</p>
        </div>
        <div class="bg-slate-100 flex justify-evenly p-3 rounded-lg">
            <div>
                <p class="text-gray-600">Assignee:</p>
                <p class="text-xl font-semibold">${details.assignee}</p>
            </div>
            <div>
                <p class="text-gray-600">Priority:</p>
                <div>${statusBadge(details)}</div>
            </div>
        </div>
  `;
  document.getElementById('my_modal_5').showModal();
}

//all card display
const allCardDisplay =(cards)=>{ 
    const parentDiv=document.getElementById("card-containar");
    parentDiv.innerHTML='';
    cards.forEach(card => {
        const childDiv=document.createElement('div');

        childDiv.innerHTML=`
        <div onclick="showIssueDeteils(${card.id})" class="card-bord shadow-sm border-t-4 ${colorOfBorder(card.priority)} rounded-md h-full">
         <!-- card top stutas -->
            <div class="flex justify-between p-3">
              <!-- left side -->
              <div id="open-closed" class="flex">
               ${ statusIcone(card)}
              </div>
              <!-- right side -->
              <div id="h-m-d">${statusBadge(card)} </div>
            </div>

             <div class="p-3">
              <h2 class="text-xl font-bold ">${card.title}</h2>
              <p class="line-clamp-2 text-gray-500">${card.description}</p>
             </div>

              <div class="p-3 flex gap-1">
                
               ${labelsShow(card.labels)}
                
              </div>

              <hr class="border-gray-400">
                <!-- name and date -->
              <div class="p-3">
                <p class="text-gray-400 font-thin">#<span>${card.id}</span> ${card.assignee}</p>
                <p class="text-gray-400 font-thin">${card.createdAt}</p>
              </div>
              </div>
        `;
        parentDiv.appendChild(childDiv);
      });
      // cardcount 
      const cardcount=document.getElementById("card-count");
      const cardLength=parentDiv.children.length;
      cardcount.innerText=cardLength;
}

//loding korar function
const loding=document.getElementById("loding");
    const startLoding =()=>{
        loding.classList.remove('hidden');
    }
    const endLoding =()=>{
        loding.classList.add('hidden');
    }

//function for status icon
const statusIcone=(card)=>{
  //open-closed logic
        let statusIcon='';
        if(card.status === "open"){
          statusIcon=`<img class=" w-full" src="image/Open-Status.png" alt=""></img>`;
        }
        else{
          statusIcon=`<img class=" w-full" src="image/Closed- Status .png" alt="">`;
        }
        return statusIcon;
}
//function for status open and closed 
const statusText=(card)=>{
  //open-closed logic
        let statusIcon='';
        if(card.status === "open"){
          statusIcon=`<p class="rounded-full bg-success text-white w-fit px-2 font-semibold">Opened </p>`;
        }
        else{
          statusIcon=` <p class=" rounded-full bg-error text-white w-fit px-2 font-semibold">Closed </p>`;
        }
        return statusIcon;
}
// status badge er kaj kam 
function statusBadge(card) {
  let status='';
  if(card.priority==="high"){
    status=`<h3 class="badge badge-error badge-soft rounded-full font-semibold">HIGH</h3>`;
  }
  else if(card.priority==="medium"){
    status=`<h3 class=" badge badge-warning badge-soft rounded-full font-semibold">MEDIUM</h3>`;
  }
  else{
    status=`<h3 class=" badge badge-neutral badge-soft rounded-full font-semibold text-gray-500">LOW</h3>
    `;
  }
  return status;
}
//card er uporer color
const colorOfBorder=(priority)=>{
  if(priority === "high"|| priority === "medium"){
    return "border-green-700";
  }
  else{
    return "border-primary";
  }
}

// labels showing function
const labelsShow = (labels) => {
  return labels.map(label => {
    label = label.toLowerCase();
    if (label === "bug") {
      return `
        <div class="badge badge-error badge-outline rounded-full flex items-center pl-2 font-bold text-[10px]">
          <span class="relative left-1 pt-[2px]"><img src="image/Vector.png" alt=""></span>BUG
        </div>
      `;
    } else if (label === "help wanted") {
      return `
        <div class="badge badge-warning badge-outline rounded-full flex items-center pl-2 font-bold text-[10px]">
          <span class="relative left-1 pt-[2px]"><img src="image/Vector (1).png" alt=""></span>HELP WANTED
        </div>
      `;
    } else if (label === "enhancement") {
      return `
        <div class="badge badge-success badge-outline rounded-full flex items-center pl-2 font-bold text-[10px]">
          <span class="relative left-1 pt-[2px]"><img src="image/Sparkle.png" alt=""></span>ENHANCEMENT
        </div>
      `;
    } else if (label === "documentation") {
      return `
        <div class="badge badge-primary badge-outline rounded-full flex items-center pl-2 font-bold text-[10px]">
          <span class="relative left-1 pt-[2px]"><img src="image/Sparkle.png" alt=""></span>DOCUMENTATION
        </div>
      `;
    } else {
      return "";
    }
  }).join("");
};

//button togoling section 
const filterCards=(everyBtn,catagoryId)=>{
   startLoding();
  const allButton=document.querySelectorAll('.filter-btn');
  allButton.forEach(btn => {
  btn.classList.add('btn-outline')
  btn.classList.remove('btn-primary')
  
  });
  everyBtn.classList.add('btn-primary')
  everyBtn.classList.remove('btn-outline')
  //filtering er kaj kam
  if(catagoryId === "all"){
    allCardDisplay(allIssues);
    endLoding();
  }
  else{
    const filtredCard=allIssues.filter(card => card.status === catagoryId);
    allCardDisplay(filtredCard);
    endLoding();
  }

};

allCardFetch()


//search button activetion
document.getElementById("search-btn").addEventListener('click',()=>{
  const inputValue =document.getElementById("search-input").value.trim().toLowerCase() ;
  console.log(inputValue);

  startLoding();
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`)
  .then(res => res.json())
  .then((data)=>{
    console.log(data.data)
    const filterSurch=data.data;
    allCardDisplay(filterSurch);
    endLoding();
  })
})
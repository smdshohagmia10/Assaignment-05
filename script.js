const container = document.getElementById("issue-container")
const spinner = document.getElementById("spinner")

let allIssues = []


// load all issues

function loadIssues(){

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

.then(res => res.json())

.then(data => {

allIssues = data.data

displayIssues(allIssues)

updateCounts()

})

}



// display issues

function displayIssues(issues){

container.innerHTML = ""

// issue count update
document.getElementById("issue-count").innerText =
issues.length + " Issues"

issues.forEach(issue => {

const div = document.createElement("div")

let borderColor =
issue.status === "open"
? "border-green-500"
: "border-purple-500"

// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z



div.innerHTML = `



<div class="p-4 bg-white rounded-lg border-t-4 ${borderColor} space-y-3">
<div class="p-4 bg-white rounded-lg space-y-3">
    
            <div class="flex justify-between">
                <img class="h-[30px] w-[30px]" src="./assets/Open-Status.png" alt="">
                <p class="bg-[#FEECEC] rounded-full px-8 py-2 text-[#EF4444] font-bold uppercase text-[12px]">${issue.priority}</p>
            </div>

            <div>
                <h2 class="font-semibold text-[#000000] text-[20px]">${issue.title}</h2>
                <p class="text-[#64748B]">${issue.description}</p>
            </div>

            <div class="flex gap-4">
                <div class="flex items-center gap-1 bg-[#FEECEC] rounded-full px-4 py-2">
                    <img src="./assets/Vector (3).png" alt="">
                    <p class="text-[12px] font-bold text-[#EF4444]">${issue.labels[0]}</p>
                </div>
                <div class="flex items-center bg-[#FFF8DB] gap-1 rounded-full px-4 py-2">
                    <img src="./assets/vector(4).png" alt="">
                    <p class="text-[12px] font-bold text-[#D97706]">${issue.labels[1]}</p>
                </div>
            </div>

            <hr>

            <div class="">
                <p class="text-[12px] text-[#64748B]">#1 by john_doe</p>
                <p class="text-[12px] text-[#64748B]">1/15/2024</p>
            </div>

        </div>

`

container.appendChild(div)

})

}



// filter issues

function filterIssues(status){

if(status === "all"){

displayIssues(allIssues)

return

}

const filtered = allIssues.filter(issue => issue.status === status)

displayIssues(filtered)

}



// search issue

function searchIssue(){

const text = document
.getElementById("searchText")
.value
.toLowerCase()

const filtered = allIssues.filter(issue =>
issue.title.toLowerCase().includes(text)
)

displayIssues(filtered)

}



// open closed count

function updateCounts(){

const openCount =
allIssues.filter(i => i.status === "open").length

const closedCount =
allIssues.filter(i => i.status === "closed").length

document.getElementById("openCount").innerText =
openCount

document.getElementById("closedCount").innerText =
closedCount

}



// start

loadIssues()

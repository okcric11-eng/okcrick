// Load all matches
function loadMatchList() {
  const matchRef = ref(db,"matches");
  onValue(matchRef, snap=>{
    const matches = snap.val()||{};
    const select = document.getElementById("matchSelect");
    select.innerHTML="";
    Object.keys(matches).forEach(id=>{
      const opt = document.createElement("option");
      opt.value = id; opt.innerText = id; select.appendChild(opt);
    });
  });
}

function createNewMatch(){
  const key = "match"+Date.now();
  set(ref(db,"matches/"+key),{
    score:{teamA:{short:"",runs:0,wickets:0,overs:"0.0"},
           teamB:{short:"",runs:0,wickets:0,overs:"0.0"},
           rr:"", rrr:"", partnership:"", last:""},
    batsmen:{}, bowlers:{}
  }).then(()=>{
    alert("New Match: "+key);
    loadMatchList();
    loadMatch(key);
  });
}
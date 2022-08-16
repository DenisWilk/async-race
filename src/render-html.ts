const body: HTMLBodyElement = document.querySelector('.body')!;
const bodyHTML = `
<div class="blackout blackout-top"></div>
<div class="blackout blackout-bottom"></div>
<div class="garage-titles">
    <h4 class="garage-count-title" id="garage-count-title">GARAGE:</h4>
    <h4 class="page-count-title" id="page-count-title">PAGE:</h4>
</div>
<div class="page-btns">
    <button class="btn page-btn garage-btn btn-inactive" id="garage-btn">GARAGE</button>
    <button class="btn page-btn winners-btn" id="winners-btn">WINNERS</button>
</div>
<div class="control-menu">
    <input type="text" class="input input-create" id="input-create">
    <input type="color" class="input input-color" id="color-create">
    <button class="btn create-btn" id="create-btn">CREATE</button>
    <input type="text" class="input input-update input-inactive" id="input-update">
    <input type="color" class="input input-color input-inactive" id="color-update">
    <button class="btn update-btn btn-inactive" id="update-btn">UPDATE</button>
    <button class="btn race-btn" id="race-btn">RACE</button>
    <button class="btn reset-btn btn-inactive" id="reset-btn">RESET</button>
    <button class="btn generate-cars-btn" id="generate-cars-btn">GENERATE CARS</button>
</div>
<div class="win-title">
</div>
<div class="garage" id="garage">
</div>
<div class="pagination-btns">
    <button class="btn prev-btn" id="prev-btn">PREV</button>
    <button class="btn next-btn" id="next-btn">NEXT</button>
</div>

<div class="winners-container" id="winners-container">
<div class="winner-titles">
    <h4 class="garage-count-title" id="garage-count-title">WINNERS:</h4>
    <h4 class="page-count-title" id="page-count-title">PAGE:</h4>
</div>
<div class="winners-table">
     <ul class="winners-table-titles">
         <li class="winners-table-title">Pos.</li>
         <li class="winners-table-title">Car</li>
         <li class="winners-table-title">Car Name</li>
         <li class="winners-table-title">Wins</li>
         <li class="winners-table-title">Best Time</li>
     </ul>
     <ul class="winners-items">
         <li class="winners-item">01</li>
         <li class="winners-item">02</li>
         <li class="winners-item">03</li>
         <li class="winners-item">04</li>
         <li class="winners-item">05</li>
         <li class="winners-item">06</li>
         <li class="winners-item">07</li>
         <li class="winners-item">08</li>
         <li class="winners-item">09</li>
         <li class="winners-item">10</li>
     </ul>   
</div>
<div class="winners-pagination-btns">
    <button class="btn prev-btn btn-inactive" id="winners-prev-btn">PREV</button>
    <button class="btn next-btn btn-inactive" id="winners-next-btn">NEXT</button>
</div>
</div>
`;

export function renderHTML() {
    body.innerHTML = bodyHTML;
}
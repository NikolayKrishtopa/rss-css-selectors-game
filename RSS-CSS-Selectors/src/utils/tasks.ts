import { Tasks } from '../types/models';

const TASKS: Tasks = [
  {
    id: 1,
    title: 'Find apple',
    htmlCode: `   
          <div class="pickle"></div>
          <div class="orange"></div>
          <div class="apple desired"></div>
`,
    syntheticCode: `
    <div class = "table">
      <pickle/>
      <orange/>
      <apple/>
    </div>`,
    correct: ['apple'],
    description: `You task here to find the apple among the other fruits`,
  },
  {
    id: 2,
    title: 'Find all plates',
    htmlCode: `       <div class="plate desired"></div>
        <div class="plate desired"></div>
        `,
    syntheticCode: `
    <div class = "table">
		<plate/></plate>
    </table>`,
    correct: ['plate'],
    description: `You task here to apply to all the plate on the table`,
  },
  {
    id: 3,
    title: 'Find Orange on the plate',
    htmlCode: `
    <div class="orange"></div>
           <div class="plate">
          <div class="apple apple_small"></div>
        </div>
        <div class="plate">
          <div class="orange desired"></div>
        </div>
        <div class="plate plate_style_blue-bordered">
          <div class="pickle"></div>
        </div>
    `,
    syntheticCode: `
		<div class = "table">
      <orange/>
		  <plate>
        <orange/>
      </plate>
      <plate class="fancy">
        <pickle/>
      </plate>
    </table>`,
    correct: ['plate orange', 'plate > orange'],
    description: `You need to find an orange located on the plate`,
  },
  {
    id: 4,
    title: 'Select the pickle on the fancy plate',
    htmlCode: `
    <div class="bento">
     <div class="pickle"></div>
     </div>
         <div class="plate plate_style_blue-bordered">
          <div class="apple"></div>
        </div>
        <div class="plate">
          <div class="pickle"></div>
        </div>
        <div class="plate plate_style_blue-bordered">
          <div class="pickle desired"></div>
        </div>
      
    `,
    syntheticCode: `
      <div class = "table">
        <bento>
          <pickle/>
        </bento>
        <plate class="fancy">
          <apple/>
        </plate>
        <plate>
          <pickle/>
        </plate>
        <plate class="fancy">
          <pickle/>
        </plate>
      </div>`,
    correct: ['.fancy pickle'],
    description: `Your task is to choose a pickle on the fancy plate`,
  },
  {
    id: 5,
    title: 'Find small apples',
    htmlCode: `
    <div class="bento">
      <div class="apple apple_small desired">
      </div>
    </div>
    <div class="plate plate_style_blue-bordered">
    <div class="orange"></div>
    </div>
    <div class="plate">
    <div class="apple apple_small desired"></div>
    </div>
    <div class="plate plate_style_blue-bordered">
    <div class="pickle "></div>
    </div>
    `,
    syntheticCode: `
    <div class = "table">
		  <bento>
        <apple class="small"/>
      </bento>
		  <plate class="fancy">
        <orange/>
      </plate>
		  <plate>
        <apple class="small"/>
      </plate>
		  <plate class="fancy">
        <pickle/>
      </plate>
    </div>`,
    correct: ['.small', 'apple.small', 'apple .small', 'apple > .small'],
    description: `find and choose all the small apples located anywhere`,
  },
  {
    id: 6,
    title: 'Find the middle pickle',
    htmlCode: `
     <div class="plate">
          <div class="pickle "></div>
          <div class="pickle desired"></div>
          <div class="pickle "></div>
        </div>
    `,
    syntheticCode: `
    <div class = "table">
		  <plate>
        <pickle/>
        <pickle/>
        <pickle/>
      </plate>
    </div>`,
    correct: [
      'plate:nth-child(2)',
      'pickle:nth-of-type(2)',
      'pickle:nth-of-type(2n)',
    ],
    description: `Find the middle pickle`,
  },
  {
    id: 7,
    title: 'Choose the small oranges on the plate',
    htmlCode: `
    <div class="orange orange_small"></div>
        <div class="plate">
        <div class="orange orange_small desired"></div>
        </div>
        <div class="apple"></div>
          <div class="plate plate_style_blue-bordered">
        <div class="orange orange_small desired"></div>
        </div>
        
    `,
    syntheticCode: `
    <div class = "table">
      <orange class="small"/>
      <plate>
        <orange class="small"/>
      </plate>
      <apple/>
      <plate class="fancy">
        <orange class="small"/>
      </plate>
    </div>`,
    correct: ['plate .small', 'plate.small', 'plate > .small'],
    description: ``,
  },
];

export default TASKS;

import { Tasks } from '../types/models';

const TASKS: Tasks = [
  {
    id: 1,
    title: 'Find apple',
    htmlCode: '<div><p>Пошел нахуй отсюда, мальчик</p></div>',
    syntheticCode: `
		<plate>
		  <apple class='apple'/>
		</plate>`,
    correct: '.apple',
  },
  {
    id: 2,
    title: 'Find cucumbers',
    htmlCode: '<div><p>Ищи огурец, пидр</p></div>',
    syntheticCode: `
		<plate>
		  <cucumber class='cucumber'/>
		</plate>`,
    correct: '.cucumber',
  },
  {
    id: 3,
    title: 'Find small Apple',
    htmlCode: '<div><p>Где мелкое яблоко?</p></div>',
    syntheticCode: `
		<plate>
		  <apple class='small'/>
		  <apple class='big'/>
		  <apple class='big'/>
		</plate>`,
    correct: 'apple .small',
  },
  {
    id: 4,
    title: 'Find small Cucumber',
    htmlCode: '<div><p>Где мелкий огурец?</p></div>',
    syntheticCode: `
		<plate>
		  <cucumber class='small'/>
		  <cucumber class='big'/>
		  <cucumber class='big'/>
		</plate>`,
    correct: 'cucumber .small',
  },
  {
    id: 5,
    title: 'Find plate',
    htmlCode: '<div><p>Где тарелка?</p></div>',
    syntheticCode: `
		<plate>
		  <cucumber class='small'/>
		  <cucumber class='big'/>
		  <cucumber class='big'/>
		</plate>`,
    correct: 'plate',
  },
  {
    id: 6,
    title: 'Find plate',
    htmlCode: '<div><p>Где тарелка?</p></div>',
    syntheticCode: `
		<plate>
		  <cucumber class='small'/>
		  <cucumber class='big'/>
		  <cucumber class='big'/>
		</plate>`,
    correct: 'plate',
  },
];

export default TASKS;

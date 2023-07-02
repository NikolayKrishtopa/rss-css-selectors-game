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
    correct: ['.apple', 'apple'],
    description: `Adjacent Sibling Selector Select an element that directly follows
        another element A + B This selects all B elements that directly follow
        A. Elements that follow one another are called siblings. They're on the
        same level, or depth. In the HTML markup for this level, elements that
        have the same indentation are siblings. Examples p + .intro selects
        every element with class="intro" that directly follows a p div + a
        selects every a element that directly follows a div`,
  },
  {
    id: 2,
    title: 'Find cucumbers',
    htmlCode: '<div><p>Ищи огурец, пидр</p></div>',
    syntheticCode: `
		<plate>
		  <cucumber class='cucumber'/>
		</plate>`,
    correct: ['.cucumber'],
    description: `Adjacent Sibling Selector Select an element that directly follows
        another element A + B This selects all B elements that directly follow
        A. Elements that follow one another are called siblings. They're on the
        same level, or depth. In the HTML markup for this level, elements that
        have the same indentation are siblings. Examples p + .intro selects
        every element with class="intro" that directly follows a p div + a
        selects every a element that directly follows a div`,
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
    correct: ['apple .small'],
    description: `Adjacent Sibling Selector Select an element that directly follows
        another element A + B This selects all B elements that directly follow
        A. Elements that follow one another are called siblings. They're on the
        same level, or depth. In the HTML markup for this level, elements that
        have the same indentation are siblings. Examples p + .intro selects
        every element with class="intro" that directly follows a p div + a
        selects every a element that directly follows a div`,
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
    correct: ['cucumber .small'],
    description: `Adjacent Sibling Selector Select an element that directly follows
        another element A + B This selects all B elements that directly follow
        A. Elements that follow one another are called siblings. They're on the
        same level, or depth. In the HTML markup for this level, elements that
        have the same indentation are siblings. Examples p + .intro selects
        every element with class="intro" that directly follows a p div + a
        selects every a element that directly follows a div`,
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
    correct: ['plate'],
    description: `Adjacent Sibling Selector Select an element that directly follows
        another element A + B This selects all B elements that directly follow
        A. Elements that follow one another are called siblings. They're on the
        same level, or depth. In the HTML markup for this level, elements that
        have the same indentation are siblings. Examples p + .intro selects
        every element with class="intro" that directly follows a p div + a
        selects every a element that directly follows a div`,
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
    correct: ['plate'],
    description: `Adjacent Sibling Selector Select an element that directly follows
        another element A + B This selects all B elements that directly follow
        A. Elements that follow one another are called siblings. They're on the
        same level, or depth. In the HTML markup for this level, elements that
        have the same indentation are siblings. Examples p + .intro selects
        every element with class="intro" that directly follows a p div + a
        selects every a element that directly follows a div`,
  },
];

export default TASKS;

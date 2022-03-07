const personas = [
	{
		nombre: 'Ismael',
		edad : 24
	},
	{
		nombre: 'Ana',
		edad : 27
	},
	{
		nombre: 'Luis',
		edad : 21
	},
];

const usuarios = [
	{
		_id: 1,
		username: 'admin',
		password: 'admin123'
	},
	{
		_id: 2,
		username: 'role',
		password: '123456'
	},
	{
		_id: 3,
		username: 'ismael',
		password: 'ismael123'
	},
	{
		_id: 4,
		username: 'evelyn',
		password: 'evelyn123'
	},
]

// List<Int> numeros = new List<Int>(); JAVA
const numeros : number[] = [0,1,2,3,4];

// export defaults

export default personas;

// 1ra forma
export {
	personas, numeros, usuarios
}
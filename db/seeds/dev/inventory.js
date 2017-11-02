exports.seed = function(knex, Promise) {
	return knex('inventory')
		.del()
		.then(() => {
			return knex('inventory').insert([
				{
					id: 1,
					item: 'Fodera Emperor Standard',
					price: 5850,
					item_description:
						"This premium 5-string bass was handcrafted by the same luthiers in the same shop responsible for creating Fodera's world-class custom instruments, and the materials used are second to none.",
					item_url:
						'https://cdn3.volusion.com/nvcpd.gmazx/v/vspfiles/photos/FoderaMonarch5BOBuckeye5799-2T.jpg?1446651323',
				},
				{
					id: 2,
					item: 'Yamaha John Patitucci 6-string Signature Bass',
					price: 2899,
					item_description:
						'The Yamaha TRBJP2 6-string solidbody electric bass guitar was created by a meeting of the minds with one of the most respected bass players of our time, John Patitucci.',
					item_url:
						'http://store.basscentral.com/content/assets/41/411356/Yamaha_Bass/YAMAHAPATITUCCI6AMBER074EFRT.jpg',
				},
				{
					id: 3,
					item: 'Ernie Ball Music Man Bongo 6 HH',
					price: 2249,
					item_description:
						'The Ernie Ball Music Man Bongo 6 HH is a beautifully balanced 6-string electric bass with a resonant basswood body, fast-playing maple neck, and a rosewood fingerboard.',
					item_url:
						'http://d2ydh70d4b5xgv.cloudfront.net/images/3/d/ernie-ball-music-man-musicman-bongo-6-string-bass-stealth-black-ce53bfc52e940b1b3081df765b3d6366.jpg',
				},
				{
					id: 4,
					item: 'Ibanez BTB746 BTB Standard',
					price: 949,
					item_description:
						'The 5-piece maple and rosewood neck is flanked by mahogany and ash wings topped with walnut. This unique tonewood combination serves as a recipe for complex harmonics and epic sustain.',
					item_url:
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJLDmHe65hCryo9bJ10HpX82nTwj3dwb02dPc9QF3u4BwjA6hm4g',
				},
				{
					id: 5,
					item: 'Ibanez Bass Workshop SRFF806BKS Multi-Scale',
					price: 1049,
					item_description:
						'The Ibanez SRFF806BKS 6-string bass rocks an ash body, a 5-piece jatoba/bubinga neck, and 24 multi-scale frets on its rosewood fingerboard. ',
					item_url: 'http://ergnerds.com/wp-content/uploads/2015/03/SRFF.jpg',
				},
			]);
		})
		.then(() => {
			return knex('order_history')
				.del()
				.then(() => {
					return knex('inventory').insert([
						{ id: 1, total: 1000 },
						{ id: 2, total: 2000 },
						{ id: 3, total: 3000 },
					]);
				});
		})
		.then(() => {
			console.log('Seeding is complete.');
		})
		.catch(error => console.log(`Error seeding data: ${error}`));
};

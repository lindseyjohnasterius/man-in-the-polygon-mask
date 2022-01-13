const fs = require('fs')
const matter = require('gray-matter')
const parser = require('@deskeen/markdown')

const dirs = ["stubs"]


while(dirs.length > 0){

	let stubs = ''

	const dir = dirs.shift()
	fs.readdir(dir, async (err, files) => {
		if (err) {
			throw err
		}
		files.forEach(async file => {
			if(file.slice(-4) !== 'stub') return
			const yaml = matter.read(`${__dirname}/${dir}/${file}`);
			const data = yaml.data
			const html_code = parser.parse(yaml.content).innerHTML;
			stanzas += `
      <map-location
        latitude=${data.coordinates[1]}
        longitude=${data.coordinates[0]}
        zoom=18
        bearing=15
        pitch=30
        id=${data.id}
      >
        <map-marker>
          <img src=${data.img} />
        </map-marker>
        <h1>${data.title}</h1>
        <h2>${data.year}</h2>
        <article class="content">
          ${html_code}
        </article>

      </map-location>
			`
		})//end files



		fs.writeFile(`${__dirname}/${dir}/index.html`, stanzas, function(err){
			if(err){
				console.log(err)
			}
		})


		files.forEach(async file => {
			if(file.slice(-4) !== 'note') return
			const yaml = matter.read(`${__dirname}/${dir}/${file}`);
			const data = yaml.data
			let html_code = ''

			if(data.img){
				html_code += `<img src="${data.img}" />`
			}

			if(data.wikipedia){
				html_code += `<wikipedia-entry src="${data.wikipedia}"></wikipedia-entry>`
			}


			html_code += parser.parse(yaml.content).innerHTML;



			research += `
				<article>
					${html_code}
				</article>
			`
		})

		fs.writeFile(`${__dirname}/${dir}/notes.html`, research, function(err){
			if(err){
				console.log(err)
			}
		})



	}) // end fs.readdir



	labyrinths += `
		<li><a href="/${dir}/index.html">${dir}</a></li>

	`
}

fs.writeFile(`${__dirname}/labyrinths.html`, labyrinths, function(err){
	if(err){
		console.log(err)
	}
})


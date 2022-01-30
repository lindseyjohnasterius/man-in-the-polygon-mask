const fs = require('fs')
const matter = require('gray-matter')
const parser = require('@deskeen/markdown')

const dirs = ["stubs"]
let stubs = ''


while(dirs.length > 0){


	const dir = dirs.shift()
	fs.readdir(dir, async (err, files) => {
		if (err) {
			throw err
		}
		files.forEach(async file => {
			if(file.slice(-2) !== 'md') return

			const yaml = matter.read(`${__dirname}/${dir}/${file}`);
			const data = yaml.data
			const html_code = parser.parse(yaml.content).innerHTML;
			

			stubs += `
      <map-location
        latitude=${data.latitude}
        longitude=${data.longitude}
        zoom=18
        bearing=15
        pitch=30
        id=${data.id}
      >
        <map-marker>
          <img src=${data.img} />
        </map-marker>
        <article class="content">
          ${html_code}
        </article>

      </map-location>
			`


		})//end files

		console.log(stubs)

		fs.writeFile(`${__dirname}/stubs.html`, stubs, function(err){
			if(err){
				console.log(err)
			}
		})

	}) // end fs.readdir


}



const fs = require('fs')
const matter = require('gray-matter')
const parser = require('@deskeen/markdown')

const dirs = ["stubs"]
let stubs = ''

function getNewID() {
  return 'dtrm-xxxxxxxxxxxxxxxx-'
    .replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16)
  }) + Date.now()
}



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
			
			if(!data.id){
				data.id = getNewID()
			}
			
			if(!data.title){
				data.title = data.id
			}


			// Every location is random 
			data.latitude = 34.05 + (Math.random() - 0.5)
			data.longitude = -118.25 + (Math.random() - 0.5)
			data.zoom = Math.random() * 20
			data.bearing = Math.random() * 360
			data.pitch = Math.random() * 360
			data.img = 
		


			stubs += `
      <map-location
        latitude=${data.latitude}
        longitude=${data.longitude}
        zoom=${data.zoom}
        bearing=${data.bearing}
        pitch=${data.pitch}
        id=${data.id}
      >
        <h1>${data.title}</h1>
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



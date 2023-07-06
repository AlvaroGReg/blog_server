const validator = require("validator")
const Article = require("../models/Article")
const { query } = require("express")

const test = (req, res) => {
	return res.status(200).json({
		msg: "Acción de prueba en el controlador",
	})
};

const course = (req, res) => {
	console.log("Se ha ejecutado el endpoint 'probando'")

	return res.status(200).json([
		{
			curso: "Master en React",
			autor: "Alvaro GR",
			url: "alvarogreg.glitch.me",
		},
		{
			curso: "Master en React",
			autor: "Alvaro GR",
			url: "alvarogreg.glitch.me",
		},
	])
};

const create = (req, res) => {
	//Recoger parámetros por post a guardar
	let params = req.body

	//Validar datos
	try {
		let validate_title =
			!validator.isEmpty(params.title) &&
			validator.isLength(params.title, { min: 3, max: undefined })
		let validate_content = !validator.isEmpty(params.content)

		if (!validate_title || !validate_content) {
			throw new Error("No se ha validado la info.")
		}
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "Faltan datos por enviar",
		})
	}

	//Crear objeto a guardar y asignar valores

	const newArticle = new Article(params)

	//Asignar valores de manera manual:
	//MANUAL : newArticle.title = params.title

	//Guardar el artículo en la db
	try {
		newArticle.save();
		return res.status(200).json({
			status: "success",
			article: newArticle,
			msg: "Artículo guardado con éxito.",
		});
	} catch (error) {
		return res.status(400).json({
			status: "error",
			msg: "No se ha guardado el artículo.",
		})
	}
}

const list = async (req, res) => {
	let num = 20
	if (req.params.lasts) {
		num = 3
	}

	try {
		const query = await Article.find({}).sort({ date: -1 }).limit(num).exec()

		if (!query || query.length === 0) {
			return res.status(404).json({
				status: "error",
				msg: "No se han encontrado artículos.",
			});
		}

		return res.status(200).send({
			status: "succes",
			articles: query,
		})
	} catch (error) {
		return res.status(500).json({
			status: "error",
			msg: "Se produjo un error en la consulta de artículos.",
		})
	}
}

module.exports = {
	test,
	course,
	create,
	list,
}

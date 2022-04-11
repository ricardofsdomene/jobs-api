const Company = require("../models/Company");
const Vaga = require("../models/Vaga");

exports.company = async (req, res) => {
  try {
    const { name, avatar, description } = req.body;

    if (name.length === 0) {
      return res.json({
        status: "Erro!",
        error: "Você precisa inserir o nome da empresa",
      });
    }

    if (avatar.length === 0) {
      return res.json({
        status: "Erro!",
        error: "Você precisa inserir uma imagem",
      });
    }

    if (description.length === 0) {
      return res.json({
        status: "Erro!",
        error: "Você precisa inserir seu email",
      });
    }

    const e_nome = await Company.findOne({ name }).lean();
    if (e_nome) {
      return res.json({
        status: "Erro!",
        error: "Essa empresa já foi registrada",
      });
    }

    const company = new Company({
      name,
      avatar,
      description,
    });
    await company.save();

    const companyData = {
      id: company._id,
      name: company.name,
      avatar: company.description,
      avatar: company.avatar,
    };

    const data = { company: companyData };

    return res.json({ status: "Empresa criada com sucesso!", data });
  } catch (e) {
    return res.status(500).json({ status: "Erro!", error: e });
  }
};

exports.companies = async (req, res) => {
  try {
    const companies = await Company.find();
    return res.json({ companies });
  } catch (error) {
    return res.json({ error });
  }
};

exports.get = async (req, res) => {
  try {
    const company = await Company.find();
    res.json(company);
  } catch (e) {
    return res.status(500).json({ stauts: "Erro!", erorr: e });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.companyId
    const company = await Company.findOne({ _id: id });
    res.json(company);
  } catch (e) {
    return res.status(500).json({ stauts: "Erro!", erorr: e });
  }
};

exports.getVagas = async (req, res) => {
  try {
    const empresaId = req.params.companyId;
    const vagas = await Vaga.find({ empresaId });
    res.json(vagas);    
  } catch (error) {
    return res.status(500).json({ stauts: "Erro!", erorr: e });
  }
};

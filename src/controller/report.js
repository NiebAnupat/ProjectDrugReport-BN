// import * as fs from "fs";
// import {PrismaClient} from "@prisma/client";
// const prisma = new PrismaClient();
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getReport = async (req, res) => {
  const { id } = req.params;
  const report = await prisma.report.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      report_img: true,
    },
  });
  res.status(200).json(report);
};

const getReports = async (req, res) => {
  const reports = await prisma.report.findMany({
    include: {
      report_img: true,
    },
  });

  res.json(reports);
  console.log("Sent all reports");
};

const getCheckedReports = async (req, res) => {
  const reports = await prisma.report.findMany({
    where: {
      checked: true,
    },
    include: {
      report_img: true,
    },
    orderBy: {
      edit_at: "desc",
    },
  });
  res.json(reports);
  console.log("Sent Checked reports");
};

const getUncheckedReports = async (req, res) => {
  const reports = await prisma.report.findMany({
    where: {
      checked: false,
    },
    include: {
      report_img: true,
    },
    orderBy: {
      edit_at: "desc",
    },
  });
  res.status(200).json(reports);
};

const createReport = async (req, res) => {
  const { title, detail, location, date } = req.body;
  const report = await prisma.report.create({
    data: {
      title,
      detail,
      location,
      date: new Date(date),
    },
  });
  const images = req.files;
  if (images) {
    for (let i = 0; i < images.length; i++) {
      const { filename } = images[i];
      await prisma.report_img.create({
        data: {
          img: fs.readFileSync(__basedir + "/assets/temp/" + filename),
          report_id: report.id,
        },
      });
      // delete file from temp folder
      fs.unlinkSync(__basedir + "/assets/temp/" + filename);
    }
  }
  console.log("Report created...");

  res.status(200).json(report);
};

const checkReport = async (req, res) => {
  const { id } = req.params;
  const report = await prisma.report.update({
    where: {
      id: parseInt(id),
    },
    data: {
      checked: true,
      edit_at: new Date(),
    },
  });
  res.status(200).json(report);
  console.log("Report checked...");
};

module.exports = {
  getReport,
  getReports,
  getCheckedReports,
  getUncheckedReports,
  createReport,
  checkReport,
};

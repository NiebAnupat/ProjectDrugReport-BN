import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getReport = async (req, res) => {
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

export const getReports = async (req, res) => {
  const reports = await prisma.report.findMany({
    include: {
      report_img: true,
    },
  });
  res.json(reports);
};

export const getUncheckedReports = async (req, res) => {
  const reports = await prisma.report.findMany({
    where: {
      checked: false,
    },
    include: {
      report_img: true,
    },
  });
  res.status(200).json(reports);
};

export const createReport = async (req, res) => {
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

export const checkReport = async (req, res) => {
  const { id } = req.params;
  const report = await prisma.report.update({
    where: {
      id: parseInt(id),
    },
    data: {
      checked: true,
    },
  });
  res.status(200).json(report);
};

export const uploadImg = async (req, res) => {
  const { file } = req;
  const { filename } = file;

  // get last report id
  const reports = await prisma.report.findMany();
  const lastReport = reports[-1];
  const lastReportId = lastReport.id;

  const report = await prisma.report_img.create({
    data: {
      img: fs.readFileSync(__basedir + "/assets/temp/" + filename),
      report_id: lastReportId,
    },
  });
  res.status(200).json(report);
  // delete file from temp folder
  fs.unlinkSync(__basedir + "/assets/temp/" + filename);
};

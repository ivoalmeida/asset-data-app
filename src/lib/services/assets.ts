import { PrismaClient } from "@prisma/client";
import { Asset } from "@/lib/models/asset";

const prisma = new PrismaClient();

export async function create({ address, company, latitude, longitude }: Asset) {
  const user = await prisma.asset.create({
    data: {
      address,
      latitude,
      longitude,
      company: {
        connect: { id: company.id },
      },
    },
  });
  return user;
}

export async function findAll() {
  const assets = await prisma.asset.findMany({
    include: {
      company: true,
    },
  });
  return assets;
}

export async function findByCompanyId(companyId: number) {
  const assets = await prisma.asset.findMany({
    include: {
      company: true,
    },
    where: {
      companyId,
    },
  });
  return assets;
}

export async function ddd(asset: Asset) {
  return queryWrapper(create, asset);
}

export async function queryWrapper<TInput, TOutput>(
  cb: (data: TInput) => Promise<TOutput>,
  data: TInput
) {
  return new Promise((resolve, reject) => {
    cb(data)
      .then(async (result: TOutput) => {
        resolve(result);
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        reject(e);
        process.exit(1);
      });
  });
}

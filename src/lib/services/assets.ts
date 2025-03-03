import { PrismaClient } from "@prisma/client";
import { Asset } from "@/lib/models";

const prisma = new PrismaClient();

export async function create(assets: Omit<Asset, "id" | "company">[]) {
  await createCompanyIfNoneExist(assets?.[0].companyId);

  const result = await handler(prisma.asset.createMany, {
    data: assets,
  });
  return result;
}

async function createCompanyIfNoneExist(companyId: string) {
  const companyExists = await handler(prisma.company.findUnique, {
    where: { id: companyId },
  });

  if (!companyExists) {
    await handler(prisma.company.create, { data: { id: companyId } });
  }
}

export async function findAll() {
  const assets = await handler(prisma.asset.findMany, {
    include: {
      company: true,
    },
  });
  return assets;
}

export async function findByCompanyId(companyId: string) {
  const assets = await handler(prisma.asset.findMany, {
    include: {
      company: true,
    },
    where: {
      companyId,
    },
  });
  return assets;
}

export async function handler<TInput, TOutput>(
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

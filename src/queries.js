import { HttpError } from 'wasp/server'

export const getOrphanageNeeds = async ({ orphanageId }, context) => {
  if (!context.user) { throw new HttpError(401) }
  const needs = await context.entities.Need.findMany({
    where: { orphanageId },
    select: {
      id: true,
      itemName: true,
      quantity: true,
      urgencyLevel: true
    }
  });
  return needs;
}

export const getNearbyOrphanages = async ({ location }, context) => {
  if (!context.user) { throw new HttpError(401) }
  // Assuming location is a string for simplicity. In real scenario, it might be coordinates.
  const orphanages = await context.entities.Orphanage.findMany({
    where: { location: { contains: location } }
  });
  return orphanages;
}

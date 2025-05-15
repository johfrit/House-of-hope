import { HttpError } from 'wasp/server'

export const createNeed = async ({ itemName, quantity, urgencyLevel, orphanageId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const orphanage = await context.entities.Orphanage.findUnique({
    where: { id: orphanageId }
  });
  if (!orphanage || orphanage.id !== context.user.orphanageId) { throw new HttpError(403) };

  return context.entities.Need.create({
    data: {
      itemName,
      quantity,
      urgencyLevel,
      orphanage: { connect: { id: orphanageId } }
    }
  });
}

export const updateNeed = async ({ needId, itemName, quantity, urgencyLevel }, context) => {
  if (!context.user) { throw new HttpError(401) };
  
  const need = await context.entities.Need.findUnique({
    where: { id: needId },
    include: { orphanage: true }
  });
  if (!need || need.orphanage.id !== context.user.orphanageId) { throw new HttpError(403) };
  
  return await context.entities.Need.update({
    where: { id: needId },
    data: { itemName, quantity, urgencyLevel }
  });
}

export const deleteNeed = async ({ needId }, context) => {
  if (!context.user) { throw new HttpError(401) };
  const need = await context.entities.Need.findUnique({
    where: { id: needId },
    include: { orphanage: true }
  });
  if (!need) { throw new HttpError(404, 'Need not found') };
  if (need.orphanage.id !== context.user.orphanageId) { throw new HttpError(403) };
  return await context.entities.Need.delete({
    where: { id: needId }
  });
}

export const markDonation = async ({ needId, donorId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  // Ensure the authenticated user is the donor attempting to mark a donation.
  const donor = await context.entities.Donor.findUnique({
    where: { id: donorId }
  });
  if (donor.id !== context.user.donorId) { throw new HttpError(403) };

  // Check if the need exists.
  const need = await context.entities.Need.findUnique({
    where: { id: needId }
  });
  if (!need) { throw new HttpError(404, 'Need not found') };

  // Create the donation.
  return context.entities.Donation.create({
    data: {
      needId: need.id,
      donorId: donor.id
    }
  });
}

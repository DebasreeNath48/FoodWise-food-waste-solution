// controllers/organizationController.js
import Organization from "../models/orgModel.js";

// Create a new organization
export const createOrganization = async (req, res) => {
  const { name, email, phoneNo, about, type, address,password } = req.body;
  try {
    const newOrganization = new Organization({ name, email, phoneNo, about, type, address,password });
    await newOrganization.save();
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(500).json({ message:error.message });
  }
};


//login for organisation
export const loginOrganization = async (req, res) => {
  const { name, password } = req.body;
  try {
    const organization = await Organization.findOne({ name });
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const isMatch = await bcrypt.compare(password, organization.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    res.status(200).json({ token, organization: { id: organization._id, name: organization.name } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get a single organization by ID
export const getOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await Organization.findById(id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ message: "Error getting organization", error });
  }
};

// Get all organizations
export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({});
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ message: "Error getting organizations", error });
  }
};

// Delete an organization by ID
export const deleteOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await Organization.findByIdAndDelete(id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting organization", error });
  }
};

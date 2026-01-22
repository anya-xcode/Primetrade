const prisma = require('../prisma/prisma');

// Get all users with their credentials
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        password: true, // Note: In production, showing hashed passwords is still sensitive
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users',
      error: error.message
    });
  }
};

import { NextFunction, Response } from "express";
import { logger } from "@/common/winston/winston";
import { CustomRequest } from "@/types/request";
import {
  checkMongoDB,
  checkRedis,
  createHealthCheckResponse,
  formatMemoryUsage,
} from "@/entities/health/health.helper";
import { StatusCodes } from "http-status-codes";
import redis from "@/config/redis/redis";

export class HealthController {
  private logFileName: string;

  constructor() {
    this.logFileName = "[Auth Controller]";
  }

  /**
   * Handles health of server.
   * @param _req - CustomRequest object
   * @param res - Response object
   * @param next - Next middleware function
   */
  health = async (_: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const healthCheck = {
        mongo: await checkMongoDB(),
        redis: await checkRedis(),
        server: {
          status: "healthy",
          uptime: process.uptime(),
          memoryUsage: formatMemoryUsage(),
        },
      };

      const overallStatus = Object.values(healthCheck)
        .map((service) => service.status)
        .includes("unhealthy")
        ? "unhealthy"
        : "healthy";

      res
        .status(overallStatus === "healthy" ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR)
        .json(createHealthCheckResponse(overallStatus, healthCheck));
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`${this.logFileName} health API error`, {
          error: error.message,
        });
      } else {
        logger.error(`${this.logFileName} health API error: Unknown error occurred`);
      }
      next(error);
    }
  };

  /**
   * Handles health of server.
   * @param _req - CustomRequest object
   * @param res - Response object
   * @param next - Next middleware function
   */
  clearCache = async (_: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stream = redis.scanStream({
        match: "apiResponseCache*", // Pattern to match keys
        count: 100, // Process 100 keys per iteration
      });

      const keysToDelete: string[] = [];

      for await (const keys of stream) {
        keysToDelete.push(...keys);
      }

      if (keysToDelete.length > 0) {
        await redis.del(...keysToDelete);
        logger.info(`Cleared ${keysToDelete.length} keys with prefix apiResponseCache`);
      } else {
        logger.info("No keys found with prefix apiResponseCache");
      }
      res.json({ message: "Cache cleared successfully" });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`${this.logFileName} clearCache API error`, {
          error: error.message,
        });
      } else {
        logger.error(`${this.logFileName} clearCache API error: Unknown error occurred`);
      }
      next(error);
    }
  };
}

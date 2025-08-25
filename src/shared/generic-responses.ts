import { HttpStatus } from '@nestjs/common';
import { Response } from './models/response.model';

export class GenericResponses {
  public static GENERIC_BAD_REQUEST(): Response<void> {
    const response: Response<void> = {
      code: HttpStatus.BAD_REQUEST,
      message: 'Ha ocurrido un error, intente más tarde.',
    };
    return response;
  }

  public static GENERIC_BAD_REQUEST_MESSAGE(message: string): Response<void> {
    const response: Response<void> = {
      code: HttpStatus.BAD_REQUEST,
      message,
    };
    return response;
  }

  public static GENERIC_SUCCESS<T>(message: string, data?: T): Response<T> {
    const response: Response<T> = {
      code: HttpStatus.OK,
      message,
    };
    if (data) response.data = data;
    return response;
  }

  public static GENERIC_NOT_FOUND(message: string): Response<void> {
    const response: Response<void> = {
      code: HttpStatus.NOT_FOUND,
      message,
    };
    return response;
  }

  public static GENERIC_FOUND(message: string): Response<void> {
    const response: Response<void> = {
      code: HttpStatus.FOUND,
      message,
    };
    return response;
  }

  public static GENERIC_FOUND_DATA<T>(message: string, data: T): Response<T> {
    const response: Response<T> = {
      code: HttpStatus.FOUND,
      message,
      data,
    };
    if (data) response.data = data;
    return response;
  }

  public static GENERIC_SAVE_SUCCESS<T>(data: T): Response<T> {
    const response: Response<T> = {
      code: HttpStatus.OK,
      message: 'Se ha guardado de forma exitosa.',
      data,
    };
    if (data) response.data = data;
    return response;
  }

  public static GENERIC_SAVE_FAILED(): Response<void> {
    const response: Response<void> = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Ha ocurrido un error al intentar guardar.',
    };
    return response;
  }

  public static GENERIC_UPDATE_SUCCESS(): Response<void> {
    const response: Response<void> = {
      code: HttpStatus.OK,
      message: 'Se ha actualizado de forma exitosa.',
    };
    return response;
  }

  public static GENERIC_UPDATE_SUCCESS_DATA<T>(data?: T): Response<T> {
    const response: Response<T> = {
      code: HttpStatus.OK,
      message: 'Se ha actualizado de forma exitosa.',
      data,
    };
    if (data) response.data = data;
    return response;
  }

  public static GENERIC_UPDATE_SUCCESS_MESSAGE(
    message: string,
  ): Response<void> {
    const response: Response<void> = {
      code: HttpStatus.OK,
      message,
    };
    return response;
  }

  public static GENERIC_UPDATE_FAILED(): Response<void> {
    const response: Response<void> = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Ha ocurrido un error al intentar actualizar.',
    };
    return response;
  }

  public static GENERIC_UPDATE_FAILED_MESSAGE(message: string): Response<void> {
    const response: Response<void> = {
      code: HttpStatus.BAD_REQUEST,
      message,
    };
    return response;
  }
}

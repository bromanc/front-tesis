import { of, throwError } from 'rxjs';
import { IAccountant } from '../../schema/accountant.schema';
import { IDegree } from '../../schema/degree.schema';
import { IProcess, ISubprocess } from '../../schema/process.schema';
import { IUser } from '../../schema/user.schema';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  const dummyBody: object = {}

  describe("successful http calls", () => {
    let httpClientSpy: any;
    const dummyProcess: IProcess = {
      id: "some-id",
      name: "process-name",
      subprocess: null,
      version: "v1",
    };
    const dummyAccountant: IAccountant = {
      address: "address sample",
      email: "john.doe@test.com",
      id: "accountant-id",
      name: "accountant-name",
      phone: "09999999"
    };
    const dummySubprocess: ISubprocess = {
      accountant: dummyAccountant,
      description: "subprocess description",
      id: "subprocess-id",
      name: "subprocess-name",
      processId: "process-id"
    };
    const dummyDegree: IDegree = {
      id: "degree-id",
      name: "degree name",
      processes: [dummyProcess]
    }
    const dummyUser: IUser = {
      email: "user@example.com",
      name: "john doe",
      created_at: '',
      email_verified: false,
      identities: [],
      nickname: '',
      picture: '',
      updated_at: '',
      user_id: '',
      last_login: '',
      last_ip: '',
      logins_count: 0,
      management: undefined
    }

    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'delete', 'patch']);
      httpClientSpy.post.and.returnValue(of());
      httpClientSpy.get.and.returnValue(of());
      httpClientSpy.delete.and.returnValue(of());
      httpClientSpy.patch.and.returnValue(of());


      service = new ApiService(httpClientSpy);
    });

    it('should initialize a service successfully', () => {
      expect(service).toBeDefined();
    });
    describe("the 'get' HTTP method should be called", () => {
      it("when 'getProcesses$' is called", () => {
        httpClientSpy.get.and.returnValue(of([dummyProcess]));
        service.getProcesses$().subscribe({
          next: (value) => {
            expect(value.length).toBeGreaterThan(0);
            expect(value).toContain(dummyProcess);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });
      it("when 'getProcessById$' is called", () => {
        httpClientSpy.get.and.returnValue(of(dummyProcess));
        service.getProcessById$("id").subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummyProcess);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      it("when 'getSubprocessesByProcessId$' is called", () => {
        httpClientSpy.get.and.returnValue(of([dummySubprocess]));
        service.getSubprocessesByProcessId$("id").subscribe({
          next: (value) => {
            expect(value.length).toBeGreaterThan(0);
            expect(value).toContain(dummySubprocess);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      it("when 'getAccountants$' is called", () => {
        httpClientSpy.get.and.returnValue(of([dummyAccountant]));
        service.getAccountants$().subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toContain(dummyAccountant);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      it("when 'getDegrees$' is called", () => {
        httpClientSpy.get.and.returnValue(of([dummyDegree]));
        service.getDegrees$().subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toContain(dummyDegree);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      it("when 'getDegree$' is called", () => {
        httpClientSpy.get.and.returnValue(of(dummyDegree));
        service.getDegree$("id").subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummyDegree);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      it("when 'getUsers$' is called", () => {
        httpClientSpy.get.and.returnValue(of([dummyUser]));
        service.getUsers$().subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toContain(dummyUser);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      it("when 'getUser$' is called", () => {
        httpClientSpy.get.and.returnValue(of(dummyUser));
        service.getUser$("id").subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummyUser);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      afterAll(() => {
        expect(httpClientSpy.get).toHaveBeenCalledTimes(8);
      })
    });

    describe("the 'post' HTTP method should be called", () => {
      it("when 'createProcess$' is called", () => {
        httpClientSpy.post.and.returnValue(of(dummyProcess));
        service.createProcess$(dummyBody).subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummyProcess);
          }
        });
        expect(httpClientSpy.post).toHaveBeenCalled();
      });

      it("when 'createSubprocess$' is called", () => {
        httpClientSpy.post.and.returnValue(of(dummySubprocess));
        service.createSubprocess$("process-id", dummyBody).subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummySubprocess);
          }
        });
        expect(httpClientSpy.post).toHaveBeenCalled();
      });

      it("when 'createAccountant$' is called", () => {
        httpClientSpy.post.and.returnValue(of(dummyAccountant));
        service.createAccountant$(dummyBody).subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummyAccountant);
          }
        });
        expect(httpClientSpy.post).toHaveBeenCalled();
      });

      it("when 'createDegree$' is called", () => {
        httpClientSpy.post.and.returnValue(of(dummyDegree));
        service.createDegree$(dummyBody).subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummyDegree);
          }
        });
        expect(httpClientSpy.post).toHaveBeenCalled();
      });

      it("when 'assignDegreeToUser$' is called", () => {
        httpClientSpy.post.and.returnValue(of(dummyDegree));
        service.assignDegreeToUser$("user-id", "degree-id", "process-id").subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummyDegree);
          }
        });
        expect(httpClientSpy.post).toHaveBeenCalled();
      });

      it("when 'createUser$' is called", () => {
        httpClientSpy.post.and.returnValue(of(dummyUser));
        service.createUser$(dummyBody).subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummyUser);
          }
        });
        expect(httpClientSpy.post).toHaveBeenCalled();
      });

      afterAll(() => {
        expect(httpClientSpy.post).toHaveBeenCalledTimes(6);
      })
    });

    describe("the 'patch' HTTP method should be called", () => {
      it("when 'updateProcess$' is called", () => {
        httpClientSpy.patch.and.returnValue(of(dummyProcess));
        service.updateProcess$("process-id", dummyBody).subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummyProcess);
          }
        });
        expect(httpClientSpy.patch).toHaveBeenCalled();
      });
      it("when 'updateSubprocess$' is called", () => {
        httpClientSpy.patch.and.returnValue(of(dummySubprocess));
        service.updateSubprocess$("subprocess-id", dummyBody).subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummySubprocess);
          }
        });
        expect(httpClientSpy.patch).toHaveBeenCalled();
      });

      it("when 'updateAccountant$' is called", () => {
        httpClientSpy.patch.and.returnValue(of(dummyAccountant));
        service.updateAccountant$("accountant-id", dummyBody).subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummyAccountant);
          }
        });
        expect(httpClientSpy.patch).toHaveBeenCalled();
      });

      it("when 'updateDegree$' is called", () => {
        httpClientSpy.patch.and.returnValue(of(dummyDegree));
        service.updateDegree$("degree-id", dummyBody).subscribe({
          next: (value) => {
            expect(value).toBeDefined();
            expect(value).toEqual(dummyDegree);
          }
        });
        expect(httpClientSpy.patch).toHaveBeenCalled();
      });

      afterAll(() => {
        expect(httpClientSpy.patch).toHaveBeenCalledTimes(4);
      })
    });

    describe("the 'delete' HTTP method should be called", () => {
      it("when 'deleteProcess$' is called", () => {
        service.deleteProcess$("process-id").subscribe({});
        expect(httpClientSpy.delete).toHaveBeenCalled();
      });
      it("when 'deleteSubprocess$' is called", () => {
        service.deleteSubprocess$("subprocess-id").subscribe({});
        expect(httpClientSpy.delete).toHaveBeenCalled();
      });

      it("when 'deleteAccountant$' is called", () => {
        service.deleteAccountant$("accountant-id").subscribe({});
        expect(httpClientSpy.delete).toHaveBeenCalled();
      });

      it("when 'deleteDegree$' is called", () => {
        service.deleteDegree$("degree-id").subscribe({});
        expect(httpClientSpy.delete).toHaveBeenCalled();
      });

      it("when 'deleteUser$' is called", () => {
        service.deleteUser$("user-id").subscribe({});
        expect(httpClientSpy.delete).toHaveBeenCalled();
      });

      afterAll(() => {
        expect(httpClientSpy.delete).toHaveBeenCalledTimes(5);
      })
    });

  });

  describe("failed http calls", () => {
    let httpClientSpy: any;

    const getFailMessage: string = "fail get";
    const postFailMessage: string = "fail post";
    const patchFailMessage: string = "fail patch";
    const deleteFailMessage: string = "fail delete";

    beforeAll(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'delete', 'patch']);
      httpClientSpy.post.and.returnValue(throwError(() => new Error(postFailMessage)));
      httpClientSpy.get.and.returnValue(throwError(() => new Error(getFailMessage)));
      httpClientSpy.delete.and.returnValue(throwError(() => new Error(deleteFailMessage)));
      httpClientSpy.patch.and.returnValue(throwError(() => new Error(patchFailMessage)));


      service = new ApiService(httpClientSpy);
    });

    it('should initialize a service successfully', () => {
      expect(service).toBeDefined();
    });
    describe("the 'get' HTTP method call fails", () => {
      it("should throw an error when 'getProcesses$' is called", () => {
        service.getProcesses$().subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(getFailMessage);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });
      it("should throw an error when 'getProcessById$' is called", () => {
        service.getProcessById$("id").subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(getFailMessage);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      it("should throw an error when 'getSubprocessesByProcessId$' is called", () => {
        service.getSubprocessesByProcessId$("id").subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(getFailMessage);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      it("should throw an error when 'getAccountants$' is called", () => {
        service.getAccountants$().subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(getFailMessage);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      it("should throw an error when 'getDegrees$' is called", () => {
        service.getDegrees$().subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(getFailMessage);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      it("should throw an error when 'getDegrees$' is called", () => {
        service.getDegree$("id").subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(getFailMessage);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      it("should throw an error when 'getUsers$' is called", () => {
        service.getUsers$().subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(getFailMessage);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      it("should throw an error when 'getUser$' is called", () => {
        service.getUser$("id").subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(getFailMessage);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalled();
      });

      afterAll(() => {
        expect(httpClientSpy.get).toHaveBeenCalledTimes(8);
      })
    });

    describe("the 'post' HTTP method call fails", () => {
      it("should throw an error when 'createProcess$' is called", () => {
        service.createProcess$(dummyBody).subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(postFailMessage);
          }
        });
        expect(httpClientSpy.post).toHaveBeenCalled();
      });
      it("should throw an error when 'createSubprocess$' is called", () => {
        service.createSubprocess$("process-id", dummyBody).subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(postFailMessage);
          }
        });
        expect(httpClientSpy.post).toHaveBeenCalled();
      });

      it("should throw an error when 'createAccountant$' is called", () => {
        service.createAccountant$(dummyBody).subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(postFailMessage);
          }
        });
        expect(httpClientSpy.post).toHaveBeenCalled();
      });

      it("should throw an error when 'createDegree$' is called", () => {
        service.createDegree$(dummyBody).subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(postFailMessage);
          }
        });
        expect(httpClientSpy.post).toHaveBeenCalled();
      });

      it("should throw an error when 'assignDegreeToUser$' is called", () => {
        service.assignDegreeToUser$("user-id", "degree-id", "process-id").subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(postFailMessage);
          }
        });
        expect(httpClientSpy.post).toHaveBeenCalled();
      });

      it("should throw an error when 'createUser$' is called", () => {
        service.createUser$(dummyBody).subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(postFailMessage);
          }
        });
        expect(httpClientSpy.post).toHaveBeenCalled();
      });

      afterAll(() => {
        expect(httpClientSpy.post).toHaveBeenCalledTimes(6);
      })
    });

    describe("the 'patch' HTTP method call fails", () => {
      it("should throw an error when 'updateProcess$' is called", () => {
        service.updateProcess$("process-id", dummyBody).subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(patchFailMessage);
          }
        });
        expect(httpClientSpy.patch).toHaveBeenCalled();
      });
      it("should throw an error when 'updateSubprocess$' is called", () => {
        service.updateSubprocess$("subprocess-id", dummyBody).subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(patchFailMessage);
          }
        });
        expect(httpClientSpy.patch).toHaveBeenCalled();
      });

      it("should throw an error when 'updateAccountant$' is called", () => {
        service.updateAccountant$("accountant-id", dummyBody).subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(patchFailMessage);
          }
        });
        expect(httpClientSpy.patch).toHaveBeenCalled();
      });

      it("should throw an error when 'updateDegree$' is called", () => {
        service.updateDegree$("degree-id", dummyBody).subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(patchFailMessage);
          }
        });
        expect(httpClientSpy.patch).toHaveBeenCalled();
      });

      afterAll(() => {
        expect(httpClientSpy.patch).toHaveBeenCalledTimes(4);
      })
    });

    describe("the 'delete' HTTP method call fails", () => {
      it("should throw an error when 'deleteProcess$' is called", () => {
        service.deleteProcess$("process-id").subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(deleteFailMessage);
          }
        });
        expect(httpClientSpy.delete).toHaveBeenCalled();
      });
      it("should throw an error when 'deleteSubprocess$' is called", () => {
        service.deleteSubprocess$("subprocess-id").subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(deleteFailMessage);
          }
        });
        expect(httpClientSpy.delete).toHaveBeenCalled();
      });

      it("should throw an error when 'deleteAccountant$' is called", () => {
        service.deleteAccountant$("accountant-id").subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(deleteFailMessage);
          }
        });
        expect(httpClientSpy.delete).toHaveBeenCalled();
      });

      it("should throw an error when 'deleteDegree$' is called", () => {
        service.deleteDegree$("degree-id").subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(deleteFailMessage);
          }
        });
        expect(httpClientSpy.delete).toHaveBeenCalled();
      });

      it("should throw an error when 'deleteUser$' is called", () => {
        service.deleteUser$("user-id").subscribe({
          error: (err) => {
            expect(err).toBeDefined();
            expect(err.message).toEqual(deleteFailMessage);
          }
        });
        expect(httpClientSpy.delete).toHaveBeenCalled();
      });

      afterAll(() => {
        expect(httpClientSpy.delete).toHaveBeenCalledTimes(5);
      })
    });
  });
});

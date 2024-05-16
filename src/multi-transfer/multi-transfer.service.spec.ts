import { INestApplication } from '@nestjs/common';
import { TestModule } from '../app/test/test.module';
import { NetworkService } from '../network/network.service';
import { UserService } from '../user/user.service';
import { MultiTransferService } from './multi-transfer.service';
require('iconv-lite').encodingExists('foo');

describe('Test', () => {
  const testModule = new TestModule();
  let app: INestApplication;
  let service: MultiTransferService;
  let userService: UserService;
  let networkService: NetworkService;

  beforeAll(async () => {
    app = await testModule.createTestModule();
    service = await app.get<MultiTransferService>(MultiTransferService);
    userService = await app.get<UserService>(UserService);
    networkService = await app.get<NetworkService>(NetworkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('test', async () => {
      const user = await userService.findOne({ id: 4 });
      const network = await networkService.findOne({ id: 1 });
      const result = await service.createOne({
        user,
        network,
        hash: '',
        tokenAddress: '0x',
        memo: '',
        histories: [
          {
            from: '0x',
            to: '0x',
            amount: '0',
          },
        ],
      });
      console.log(result);
    });
  });
});

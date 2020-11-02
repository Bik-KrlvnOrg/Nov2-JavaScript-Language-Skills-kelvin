import { InputOutputService } from "./input-output.service";

describe('InputOutputServiceTest', () => {
    let service: InputOutputService

    beforeEach(() => {
        service = InputOutputService.getInstance()
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    });

});
// 타입 선언 부분

// http 모듈, createServer와 req, res를 타이핑해야 한다.
interface Request {}
interface Response {
  writeHead(status: number): void;
  end(data: Buffer): void;
}
interface Server {
  listen(port: number, callback: () => void): void;
}
interface Http {
  createServer(callback: (req: Request, res: Response) => void): Server;
}
declare const http: Http;

// fs 와 path 모듈 타이핑
interface FsPromises {
  readFile(path: string): Promise<Buffer>;
}
interface Fs {
  readFile(path: string, callback: (err: unknown, data: Buffer) => void): void;
  promises: FsPromises;
}
declare const fs: Fs;
interface Path {
  join(...paths: string[]): string;
}
declare const path: Path;
/**
 * promise는 재귀를 활용해서 타이핑
 * fs.promise 또한 fs처럼 Fs  인터페이스를 사용
 * readFile의 첫 번째 오버로딩은 콜백을 사용하는 메서드이고, 두 번째는 프로미시를 반횐하는 메서드이다.
 * path.join메서드는 매개변수의 개수가 고정되어 있지 않으므로 spread문법을 사용한다.
 */

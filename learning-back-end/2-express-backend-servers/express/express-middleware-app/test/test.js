console.log = function () { };
const fs = require('fs');
const assert = require('chai').assert;
const code = fs.readFileSync('app.js', 'utf8');
const Structured = require('structured');

// Next
describe('', function () {
    it('', function () {
        const nextStruct = function () {
            app.use(($req, $res, $next) => {
                let bodyData = $empty;
                $req.on($data, _);
                $req.on($end, () => {
                    if (bodyData) {
                        $req.body = JSON.parse(bodyData);
                    }
                    $next();
                });
            });
        }

        varCallbacks = [
            function ($empty, $data, $end) {
                return $empty.value === '' && $data.value === 'data' && $end.value === 'end';
            }
        ];

        // this is included to pass final savepoint when BP middleware has been used
        let bpStruct = function () {
            const $bodyParserName = require($bodyParser);
            app.use($bodyParserName.json());
        }

        bpVarCallbacks = [
            function ($bodyParser) {
                return $bodyParser.value === 'body-parser';
            }
        ];

        const isMatch = Structured.match(code, nextStruct, { varCallbacks: varCallbacks });
        const usesBodyParser = Structured.match(code, bpStruct, { varCallbacks: bpVarCallbacks });

        assert.isOk(isMatch || usesBodyParser, 'Did you fix the missing line in the parser so that your middleware moves on when complete?');
    });
});
use Symfony\Contracts\HttpClient\HttpClientInterface;

class SymfonyDocs
{
    private $user;

    public function __construct(HttpClientInterface $user)
    {
        $this->user = $user;
    }

    public function listusers(): array
    {
        $response = $this->client->request(
            'GET',
            'http://127.0.01/send'
        );

        $statusCode = $response->getStatusCode();
        
        $contentType = $response->getHeaders()['content-type'][0];
       
        $content = $response->getContent();
        
        $content = $response->toArray();
      

        return $content;
}